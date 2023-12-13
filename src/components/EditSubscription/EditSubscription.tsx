import { doc, setDoc, deleteDoc } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useEffect, useRef, useState } from 'react'

import { useNavigate, useParams, Link } from 'react-router-dom'

import classes from './EditSubscription.module.css'

import { EditValues } from './types'

import cancel from '../../assets/cancel.png'
import { db, auth, storage } from '../../firebase'
import { useAppSelector, useAppDispatch } from '../../hooks/useReduxHooks'
import { AlertDeleteSubscription } from '../AlertDeleteSubscription/AlertDeleteSubscription'
import { DatePick } from '../DatePicker/DatePicker'
import { NotificationDelete } from '../Notifications/NotificationDelete'
import { NotificationEdit } from '../Notifications/NotificationEdit'
import { Spinner } from '../Spinner/Spinner'
import { deleteSubscription, fetchSubscriptionsList, editSubscription } from '../store/subscriptionsSlice'

import { Subscription } from '../store/types'
import {
  validationSubscriptionSchema,
  currenciesOptions,
  paymentFrequencyOptions,
} from '../utils/validationSubscriptionSchema'
import { validTypes } from '../utils/validTypesImages'

export const EditSubscription = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { subscriptionId } = useParams()
  const { fetchedSubscriptions, loading } = useAppSelector((state) => state.subscriptionsList)

  const [disabledSubmit, setDisabledSubmit] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState('Choose new image')
  const [newImageUrl, setNewImageUrl] = useState<null | string>(null)
  const [preview, setPreview] = useState('')
  const [subscriptionDelete, setSubscriptionDelete] = useState(false)
  const [subscriptionEdit, setSubscriptionEdit] = useState(false)
  const [deleteSubscriptionBoolean, setDeleteSubscription] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (fetchedSubscriptions.length === 0) {
      dispatch(fetchSubscriptionsList())
    }
  }, [fetchedSubscriptions.length, dispatch])

  useEffect(() => {
    if (!file) {
      return
    }
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
  }, [file])

  const handleClickDelete = () => {
    setOpenAlert(true)
  }

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files !== null) {
      setFile(ev.target.files[0])
    }
  }

  const uploadImage = () => {
    setDisabledSubmit(true)
    if (!file) {
      setDisabledSubmit(false)
      setNewImageUrl(null)
      setProgress('Image is missing')
      return
    }
    if (!validTypes.includes(file.type.split('/')[1])) {
      setDisabledSubmit(false)
      setProgress('Invalid format')
      setFile(null)
      return
    }
    const storageRef = ref(storage, `images/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        if (uploadProgress === 100) {
          setProgress('Upload is almost done')
        } else {
          setProgress('Uploading...')
        }
        setFile(null)
      },
      (err) => {
        console.log(err)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setNewImageUrl(url)
          setProgress('Uploaded image')
          setDisabledSubmit(false)
        })
      },
    )
  }

  const handleDeleteSubscription = async () => {
    setDisabledSubmit(true)
    const user = auth.currentUser
    if (user && subscriptionId) {
      try {
        await deleteDoc(doc(db, 'users', user.uid, 'subscriptions', subscriptionId))
        dispatch(deleteSubscription({ subscriptionId }))
        setSubscriptionDelete(true)
        setTimeout(() => {
          navigate('/active-subscriptions')
        }, 1500)
      } catch (e) {
        console.error('Error delete subscription: ', e)
      }
    }
  }

  useEffect(() => {
    if (deleteSubscriptionBoolean) {
      handleDeleteSubscription()
    }
  })
  const subscription = fetchedSubscriptions.find((el: Subscription) => el.id === subscriptionId)

  const handleSubmit = async (values: EditValues) => {
    setLoadingEdit(true)
    setDisabledSubmit(true)
    const user = auth.currentUser
    if (user && values.date && subscription) {
      const { name, price, currency, paymentFrequency, date, id } = values
      const editedSubscription = {
        name,
        price: parseFloat(price as string),
        date,
        currency,
        paymentFrequency,
        imageUrl: newImageUrl,
        id: subscription.id,
        creationTime: subscription.creationTime,
        status: subscription.status,
      }
      try {
        await setDoc(doc(db, 'users', user.uid, 'subscriptions', id), editedSubscription)
        dispatch(editSubscription({ editedSubscription }))
        setLoadingEdit(false)
        setSubscriptionEdit(true)
        setTimeout(() => {
          navigate('/active-subscriptions')
        }, 1500)
      } catch (e) {
        setError(true)
        console.error('Error edit subscription: ', e)
      }
    }
  }
  const windowWidth = useRef(window.innerWidth)
  const uploadText = windowWidth.current < 568 ? 'Upload' : 'Click to Upload'
  const renderError = (message: string) => <p className={classes.error}>{message}</p>
  const disabledInput = disabledSubmit ? classes.inActiveUpload : classes.activeUpload
  if (loading === 'pending') return <Spinner />
  if (loading === 'succeeded' && subscription !== undefined) {
    return (
      <Formik
        initialValues={subscription}
        validationSchema={validationSubscriptionSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, setFieldValue }) => (
          <section className={classes.container}>
            <h2 className={classes.header}>Edit your subscription</h2>
            <Form className={classes.form}>
              <div className={classes.field}>
                <label htmlFor='name'>Name</label>
                <Field className={classes.input} type='text' name='name' id='name' placeholder='Spotify' />
                <ErrorMessage name='name' render={renderError} />
              </div>
              <div className={classes.field}>
                <label htmlFor='price'>Price</label>
                <Field className={classes.input} type='text' name='price' id='price' placeholder='200' />
                <ErrorMessage name='price' render={renderError} />
              </div>
              <div className={classes.field}>
                <label htmlFor='datePicker'>Next payment</label>
                <DatePick setFieldValue={setFieldValue} values={values} />
              </div>
              <div className={classes.field}>
                <label htmlFor='currency'>Currency</label>
                <Field className={classes.input} type='text' as='select' name='currency' id='currency'>
                  <option value=''>Select currency</option>
                  {currenciesOptions}
                </Field>

                <ErrorMessage name='currency' render={renderError} />
              </div>
              <div className={classes.field}>
                <label htmlFor='paymentFrequency'>Payment frequency</label>
                <Field className={classes.input} as='select' id='frequepaymentFrequencyncy' name='paymentFrequency'>
                  <option value=''>Select frequency</option>
                  {paymentFrequencyOptions}
                </Field>
                <ErrorMessage name='paymentFrequency' render={renderError} />
              </div>
              <div className={classes.upload}>
                <label className={disabledInput} htmlFor='file'>
                  <input
                    type='file'
                    id='file'
                    accept='image/*'
                    className={classes.inputImage}
                    onChange={handleChange}
                    name='file'
                    disabled={disabledSubmit}
                  />
                  <div className={classes.text}>
                    <div className={classes.text}>
                      {(file?.name && (
                        <div className={classes.imageContainer}>
                          <div>Preview</div>
                          <img src={preview} className={classes.image} alt='preview' />
                        </div>
                      )) ??
                        ((newImageUrl && (
                          <div className={classes.imageContainer}>
                            {progress} <img src={preview} className={classes.image} alt='preview' />
                          </div>
                        )) ||
                          progress)}
                    </div>
                  </div>
                </label>
                <button type='button' onClick={uploadImage} className={classes.buttonUpload} disabled={disabledSubmit}>
                  {uploadText}
                </button>
              </div>
              <button name='button' type='submit' className={classes.buttonSubmit} disabled={disabledSubmit}>
                {error
                  ? 'Something went wrong, but we fix it'
                  : (loadingEdit && (
                      <div className={classes.loaderContainer}>
                        Loading...
                        <div className={classes.loader} />
                      </div>
                    )) ||
                    'Edit Your Subscription'}
              </button>
              <button
                type='button'
                className={classes.deleteSubscription}
                onClick={handleClickDelete}
                disabled={disabledSubmit}
              >
                <img src={cancel} alt='cancel' className={classes.cancel} />
                Cancel Subscription
              </button>
              <AlertDeleteSubscription
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
                setDeleteSubscription={setDeleteSubscription}
              />
              <NotificationDelete
                subscriptionDelete={subscriptionDelete}
                setSubscriptionDelete={setSubscriptionDelete}
              />
              <NotificationEdit subscriptionEdit={subscriptionEdit} setSubscriptionEdit={setSubscriptionEdit} />
            </Form>
          </section>
        )}
      </Formik>
    )
  }

  if (subscription === undefined && loading !== 'idle') {
    return (
      <h2 className={classes.notFound}>
        Sorry, but this subscription doesn&apos;t exist
        <Link to='/active-subscriptions' className={classes.link}>
          <button type='button' className={classes.notFoundButton}>
            Go to Active Subscriptions
          </button>
        </Link>
      </h2>
    )
  }
  return null
}
