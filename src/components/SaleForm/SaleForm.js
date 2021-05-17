import React, { useEffect, useState } from 'react'
import { func, string, any } from 'prop-types'
import { useFormik } from 'formik'
import firebase from 'src/firebase'
import { saleSchema, fieldValidation } from 'schemas'
import { SELLERS } from 'constants/sellers'
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Container,
  Modal,
} from '@material-ui/core'
import {
  FormContainer,
  ModalContainer,
  MultiButtonContainer,
  TextEmphasis,
} from './saleForm.style'

const propTypes = {
  saleId: string,
  navigate: func,
  location: any,
}

const toMenuItems = (element) => <MenuItem value={element}>{element}</MenuItem>

const SaleForm = ({ saleId = null, navigate, location }) => {
  const [open, setOpen] = useState(false)

  const toSale = (values) => ({
    seller: values.seller,
    customer: values.customer,
    dateOfSale: new Date(values.dateOfSale),
    item: {
      name: values.itemName,
      value: values.itemValue,
    },
  })

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldTouched,
    setFieldError,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: location.state.sale
      ? location.state.sale
      : {
          seller: '',
          customer: '',
          dateOfSale: new Date().toISOString().split('T')[0],
          itemName: '',
          itemValue: 0,
        },
    onSubmit: (values) => {
      saleId
        ? firebase
            .firestore()
            .collection('sales')
            .doc(saleId)
            .update(toSale(values))
            .then(navigate('/'))
        : firebase
            .firestore()
            .collection('sales')
            .add(toSale(values))
            .then(navigate('/'))
    },
    isInitialValid: false,
    validateOnBlur: true,
    validationSchema: saleSchema,
  })

  useEffect(() => {
    if (!saleId) return

    firebase
      .firestore()
      .collection('/sales')
      .doc(saleId)
      .get()
      .then((snapshot) => console.info(snapshot.data()))
      .catch(console.error)
  }, [])

  const handleDelete = () => {
    firebase
      .firestore()
      .collection('sales')
      .doc(saleId)
      .delete()
      .then(navigate('/'))
      .catch(console.error)
  }

  const handleOpenModal = (event) => {
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const onBlur = async (event) => {
    event.persist()

    const fieldName = event.target.name
    const fieldValue = event.target.value

    await fieldValidation({
      setFieldTouched,
      setFieldError,
      schema: saleSchema,
      field: fieldName,
      value: fieldValue,
    })

    return handleBlur(event)
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <FormControl variant='outlined' color='black'>
            <InputLabel id='seller-label'>Seller</InputLabel>
            <Select
              id='seller'
              name='seller'
              label='Seller'
              defaultValue="Seller's name"
              displayEmpty
              value={values.seller}
              onBlur={onBlur}
              onChange={handleChange}
            >
              {SELLERS.map(toMenuItems)}
            </Select>
          </FormControl>
          <TextField
            variant='outlined'
            id='customer'
            name='customer'
            label='Customer'
            defaultValue="Customer's name"
            value={values.customer}
            onBlur={onBlur}
            onChange={handleChange}
            error={touched.customer && errors.customer}
            helperText={touched.customer && errors.customer}
          />
          <TextField
            variant='outlined'
            id='dateOfSale'
            name='dateOfSale'
            label='Date of sale'
            type='date'
            value={values.dateOfSale}
            onBlur={onBlur}
            onChange={handleChange}
            error={touched.dateOfSale && errors.dateOfSale}
            helperText={touched.dateOfSale && errors.dateOfSale}
          />
          <TextField
            variant='outlined'
            id='itemName'
            name='itemName'
            label='Item Name'
            value={values.itemName}
            onBlur={onBlur}
            onChange={handleChange}
            error={touched.itemName && errors.itemName}
            helperText={touched.itemName && errors.itemName}
          />
          <TextField
            variant='outlined'
            id='itemValue'
            name='itemValue'
            type='number'
            label='Item Value'
            value={values.itemValue}
            onBlur={onBlur}
            onChange={handleChange}
            error={touched.itemValue && errors.itemValue}
            helperText={touched.itemValue && errors.itemValue}
          />
          {saleId ? (
            <MultiButtonContainer>
              <Button
                variant='contained'
                color='primary'
                size='large'
                type='submit'
              >
                Update
              </Button>
              <Button
                onClick={handleOpenModal}
                variant='contained'
                color='secondary'
                size='large'
              >
                Delete
              </Button>
            </MultiButtonContainer>
          ) : (
            <Button
              variant='contained'
              color='primary'
              size='large'
              type='submit'
            >
              Submit
            </Button>
          )}
        </FormContainer>
      </form>
      <Modal open={open} onClose={handleClose}>
        <ModalContainer>
          Do you really want to <TextEmphasis>delete</TextEmphasis> this sale?
          <MultiButtonContainer>
            <Button variant='contained' color='secondary' onClick={handleClose}>
              No
            </Button>
            <Button onClick={handleDelete} variant='contained' color='primary'>
              Yes
            </Button>
          </MultiButtonContainer>
        </ModalContainer>
      </Modal>
    </Container>
  )
}

SaleForm.propTypes = propTypes

export { SaleForm }
