import { useState } from "react"
import { ErrorHandler } from "../errors/ErrorHandler"

type UseSubmitFormProps = {
  validateAndFetch: () => Promise<void>
  errorHandler: ErrorHandler
}

/**
 * @param UseSubmitFormProps - Props.
  * @param UseSubmitFormProps.validateAndFetch - The callback that should validate and fetch submit.
  * @param UseSubmitFormProps.errorHandler instance of error handler.
  */
export const useSubmitForm = ({validateAndFetch, errorHandler}: UseSubmitFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    try {
      setIsSubmitting(true)
      await validateAndFetch()
    } catch (err) {
      const message = errorHandler.getMessage(err)
      errorHandler.showToast(message)
    } finally {
      setIsSubmitting(false)
    }
  } 

  return {
    submit,
    isSubmitting,
  }
}