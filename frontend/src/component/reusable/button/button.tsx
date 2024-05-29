import classNames from 'classnames'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: 'button' | 'reset' | 'submit',
  rounded?: boolean,
  children: any
  buttonColor: {
    primary?: boolean,
    secondary?: boolean
    outline?: boolean
  }
}

const Button = ({
  buttonType,
  rounded,
  children,
  buttonColor,
  ...rest
}: Props) => {
  return (
    <button
      {...rest}
      type={buttonType}
      className={classNames(
        'px-4 py-2 ',
        buttonColor.primary && "bg-amber-500 text-white ",
        buttonColor.secondary && "bg-rose-800 text-white",
        buttonColor.outline && "bg-white text-amber-500 border border-amber-500",
        rounded ? "rounded-full" : "rounded-lg"
      )}
    >
      {children}
    </button>
  )
}

export default Button