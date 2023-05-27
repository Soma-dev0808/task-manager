import { ComponentPropsWithRef } from 'react'

type ContainerProps = ComponentPropsWithRef<'div'> & { isDragging: boolean }

export type { ContainerProps }
