export { saleSchema } from './sale.schema'

export const fieldValidation = async ({
  setFieldTouched,
  setFieldError,
  schema,
  field,
  value,
}) => {
  setFieldTouched(field, true, false)

  try {
    await schema.fields[field].validate(value)
    setFieldError(field, null)

    return null
  } catch ({ message }) {
    setFieldError(field, message)

    return message
  }
}
