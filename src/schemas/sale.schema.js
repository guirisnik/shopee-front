import * as yup from 'yup'
import { SELLERS } from 'constants/sellers'

const REQUIRED_MESSAGE = 'This field is mandatory.'

const sellerSchema = yup.string().required(REQUIRED_MESSAGE).oneOf(SELLERS)

const nameSchema = yup
  .string()
  .required(REQUIRED_MESSAGE)
  .matches(
    /^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/g,
    'Name must contain only letters and spaces.'
  )

const dateSchema = yup.date().required(REQUIRED_MESSAGE)

const valueSchema = yup
  .number()
  .required(REQUIRED_MESSAGE)
  .positive('Value must be a positive number.')

export const saleSchema = yup.object().shape({
  seller: sellerSchema,
  customer: nameSchema,
  dateOfSale: dateSchema,
  itemName: nameSchema,
  itemValue: valueSchema,
})
