import { useCallback } from 'react'

import { toast, ToastOptions } from 'react-toastify'

type ToastTypeUnion = 'success' | 'error' | 'info'

type ShowToastify = {
  type?: ToastTypeUnion
  title: string
  message: string | JSX.Element
  options?: ToastOptions
}

const renderToastContent = ({
  title,
  message,
}: {
  title?: ShowToastify['title']
  message: ShowToastify['message']
}) => (
  <div>
    {title && <strong>{title}</strong>}
    <br />
    {message}
  </div>
)

export const useShowToast = () => {
  const showToast = useCallback(({ type, title, message = '', options }: ShowToastify) => {
    if (type === 'error') {
      toast.error(renderToastContent({ title, message }), options)
      return
    }

    if (type === 'info') {
      toast.info(renderToastContent({ title, message }), options)
      return
    }

    toast.success(renderToastContent({ title, message }), options)
  }, [])

  return { showToast }
}
