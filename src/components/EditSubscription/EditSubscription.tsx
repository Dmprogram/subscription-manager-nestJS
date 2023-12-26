import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useEffect, useRef, useState } from 'react'

import { useNavigate, useParams, Link } from 'react-router-dom'

import classes from './EditSubscription.module.css'

import cancel from '../../assets/cancel.png'
import { useAppSelector, useAppDispatch } from '../../hooks/useReduxHooks'
import { SubscriptionService } from '../../services/subscription/subscription.service'
import { TSubscription, TSubscriptionEditFormValues } from '../../types/subscription'
import { resizeImage } from '../../utils/resizeImage'
import {
  validationSubscriptionSchema,
  currenciesOptions,
  paymentFrequencyOptions,
} from '../../utils/validationSubscriptionSchema'
import { validTypes } from '../../utils/validTypesImages'
import { AlertDeleteSubscription } from '../AlertDeleteSubscription/AlertDeleteSubscription'
import { DatePick } from '../DatePicker/DatePicker'

import { deleteSubscription, editSubscription } from '../store/subscriptions/subscriptionsActions'

export const EditSubscription = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { subscriptionId } = useParams<'subscriptionId'>()
  const { subscriptions, loading } = useAppSelector((state) => state.subscriptions)
  const [disabledSubmit, setDisabledSubmit] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState('Choose new image')
  const [newImage, setNewImage] = useState<null | string>(null)
  const [preview, setPreview] = useState('')

  const [deleteSubscriptionBoolean, setDeleteSubscription] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [error, setError] = useState<string | boolean>(false)

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

  const handleChangeImage = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    if (!ev.target.files) return
    if (ev.target.files[0] === undefined) return
    if (validTypes.includes(ev.target.files[0].type.split('/')[1])) {
      const image: File = await resizeImage(ev.target.files[0])
      setFile(image)
    } else {
      setProgress('Invalid format')
      setFile(null)
    }
  }

  const handleUploadImage = async () => {
    setError(false)
    setDisabledSubmit(true)
    if (!file) {
      setDisabledSubmit(false)
      setNewImage(null)
      setProgress('Image is missing')
      return
    }

    const formData = new FormData()
    formData.append('image', file)
    try {
      setFile(null)
      setNewImage(null)

      setProgress('Uploading...')
      const image = await SubscriptionService.uploadImage(formData)

      setNewImage(image.data.secure_url)
      setProgress('Uploaded image')
      setDisabledSubmit(false)
    } catch (err) {
      console.log(err)
      setProgress('Choose an image')
      setError('Image upload failed, we fix it')
      setDisabledSubmit(false)
    }
  }

  const handleDeleteSubscription = async () => {
    setDisabledSubmit(true)
    setLoadingDelete(true)
    try {
      const response = await dispatch(deleteSubscription(subscriptionId as string))

      if (response.meta.requestStatus === 'fulfilled') {
        setLoadingDelete(false)
        navigate(-1)
      }
    } catch (e) {
      setError('Subscription delete failed')
      console.error('Error delete subscription: ', e)
    }
  }

  useEffect(() => {
    if (deleteSubscriptionBoolean) {
      handleDeleteSubscription()
    }
  }, [deleteSubscriptionBoolean])

  const handleSubmit = async (values: TSubscriptionEditFormValues) => {
    setLoadingEdit(true)
    setDisabledSubmit(true)

    if (values.year && values.month && values.day) {
      const { name, price, currency, paymentFrequency, year, month, day, id, status, image } = values
      const editedSubscription = {
        id,
        name,
        price: typeof price === 'string' ? parseFloat(price) : price,
        year,
        month,
        day,
        currency,
        paymentFrequency,
        image: newImage || image,
        status,
      }
      try {
        const response = await dispatch(editSubscription(editedSubscription))
        setLoadingEdit(false)
        if (response.meta.requestStatus === 'fulfilled') {
          navigate(-1)
        }
      } catch (e) {
        setError('Edit subscription failed, we fix it')
        console.error('Error edit subscription: ', e)
      }
    }
  }
  const subscription = subscriptions.find((el: TSubscription) => el.id === parseInt(subscriptionId as string, 10))
  const windowWidth = useRef(window.innerWidth)
  const uploadText = windowWidth.current < 568 ? 'Upload' : 'Click to Upload'
  const renderError = (message: string) => <p className={classes.error}>{message}</p>
  const disabledInput = disabledSubmit ? classes.inActiveUpload : classes.activeUpload
  if (subscription !== undefined) {
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
                <DatePick setFieldValue={setFieldValue} year={values.year} month={values.month} day={values.day} />
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
                    onChange={handleChangeImage}
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
                        ((newImage && (
                          <div className={classes.imageContainer}>
                            {progress} <img src={preview} className={classes.image} alt='preview' />
                          </div>
                        )) ||
                          (progress === 'Uploading...' ? (
                            <div className={classes.imageContainer}>
                              <div className={classes.loader} />
                            </div>
                          ) : (
                            progress
                          )))}
                    </div>
                  </div>
                </label>
                <button
                  type='button'
                  onClick={handleUploadImage}
                  className={classes.buttonUpload}
                  disabled={disabledSubmit}
                >
                  {uploadText}
                </button>
              </div>
              {error && <div className={classes.axiosError}>{error}</div>}
              <button name='button' type='submit' className={classes.buttonSubmit} disabled={disabledSubmit}>
                {(loadingEdit && (
                  <div className={classes.loaderContainer}>
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
                {(loadingDelete && (
                  <div className={classes.loaderContainer}>
                    <div className={classes.loader} />
                  </div>
                )) || (
                  <>
                    <img src={cancel} alt='cancel' className={classes.cancel} />
                    Delete subscription
                  </>
                )}
              </button>
              <AlertDeleteSubscription
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
                setDeleteSubscription={setDeleteSubscription}
              />
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
