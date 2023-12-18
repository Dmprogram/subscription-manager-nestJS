import { collection, addDoc } from 'firebase/firestore'

import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import React, { useState, useEffect, useRef } from 'react'

import classes from './NewSubscription.module.css'

import { NewSubscriptionValues } from './types'

import { useAppDispatch } from '../../hooks/useReduxHooks'
import { DatePick } from '../DatePicker/DatePicker'

import { NotificationAdd } from '../Notifications/NotificationAdd'
import { addSubscription } from '../store/subscriptions/subscriptionsSlice'
import {
  validationSubscriptionSchema,
  currenciesOptions,
  paymentFrequencyOptions,
} from '../utils/validationSubscriptionSchema'
import { validTypes } from '../utils/validTypesImages'

export const NewSubscription = () => {
  const dispatch = useAppDispatch()
  const windowWidth = useRef(window.innerWidth)
  const uploadText = windowWidth.current < 568 ? 'Upload' : 'Click to Upload'

  const [disabledSubmit, setDisabledSubmit] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState('Choose an image')
  const [imageUrl, setImageUrl] = useState<null | string>(null)
  const [preview, setPreview] = useState('')
  const [subscriptionAdded, setSubscriptionAdded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!file) {
      return
    }
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
  }, [file])

  const handleSubmit = async (values: NewSubscriptionValues, resetForm: () => void) => {
    setLoading(true)
    setDisabledSubmit(true)
    // const user = auth.currentUser
    // if (user && values.date) {
    if (values.date) {
      const { name, price, currency, paymentFrequency, date } = values
      const newSubscription = {
        name,
        price: parseFloat(price as string),
        year: date.year,
        month: date.month,
        day: date.day,
        currency,
        paymentFrequency,
        imageUrl,
        status: true,
        id: '',
      }
      console.log(newSubscription)
      try {
        // const docRef = await addDoc(collection(db, 'users', user.uid, 'subscriptions'), newSubscription)
        // newSubscription.id = docRef.id
        // dispatch(addSubscription({ newSubscription }))
        setLoading(false)
        setImageUrl('')
        setSubscriptionAdded(true)
        setDisabledSubmit(false)
        setProgress('Choose an image')
        resetForm()
      } catch (e) {
        setError(true)
        console.error('Error adding subscription: ', e)
      }
    }
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
      setImageUrl(null)
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
        setDisabledSubmit(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageUrl(url)
          setProgress('Uploaded image')
          setDisabledSubmit(false)
        })
      },
    )
  }
  const initialValues = {
    name: '',
    price: '',
    currency: '',
    paymentFrequency: '',
    date: null,
    status: null,
    imageUrl: null,
    creationTime: null,
    id: '',
  }

  const renderError = (message: string) => <p className={classes.error}>{message}</p>
  const disabledInput = disabledSubmit ? classes.inActiveUpload : classes.activeUpload

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSubscriptionSchema}
      onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
    >
      {({ values, setFieldValue, resetForm }) => (
        <section className={classes.container}>
          <h2 className={classes.header}>New Subscription</h2>
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
                  {(file?.name && (
                    <div className={classes.imageContainer}>
                      <div>Preview</div>
                      <img src={preview} className={classes.image} alt='preview' />
                    </div>
                  )) ??
                    ((imageUrl && (
                      <div className={classes.imageContainer}>
                        {progress} <img src={preview} className={classes.image} alt='preview' />
                      </div>
                    )) ||
                      progress)}
                </div>
              </label>
              <button type='button' onClick={uploadImage} className={classes.buttonUpload} disabled={disabledSubmit}>
                {uploadText}
              </button>
            </div>
            <button name='button' type='submit' className={classes.buttonSubmit} disabled={disabledSubmit}>
              {error
                ? 'Something went wrong, but we fix it'
                : (loading && (
                    <div className={classes.loaderContainer}>
                      Loading...
                      <div className={classes.loader} />
                    </div>
                  )) ||
                  'Add new subscription'}
            </button>
            <button type='button' className={classes.clearButton} onClick={() => resetForm()} disabled={disabledSubmit}>
              <span>Clear all fields</span>
            </button>
            <NotificationAdd subscriptionAdded={subscriptionAdded} setSubscriptionAdded={setSubscriptionAdded} />
          </Form>
        </section>
      )}
    </Formik>
  )
}
