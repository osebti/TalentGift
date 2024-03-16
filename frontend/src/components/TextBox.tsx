import { twMerge } from "tailwind-merge";

interface TextBoxProps {
  id: string;
  label?: string;
  placeholder: string;
  style?: string;
  header?: boolean;
  type: string;
  textRef?: { current: HTMLInputElement | null };
}

const TextBox = (props: TextBoxProps) => {
  const { id, label='', header=true, style='', placeholder, type, textRef = null } = props;
  return (
    <div
      id={`${id}-container`}
      className="flex-col justify-start items-start w-full"
    >
      {header && 
        <div
          id={`${id}-header`}
          data-testid={`${id} header`}
          className="text-start text-black text-xl font-normal pb-2"
        >
          {label}
        </div>
      }
      <input
        id={`${id}-textbox`}
        data-testid={`${id} textbox`}
        ref={textRef}
        type={type}
        placeholder={placeholder}
        className={twMerge("text-black input outline outline-gray-300 text-xl font-normal bg-transparent w-full px-3 py-2.5 rounded-md justify-start items-center inline-flex focus:outline-darkPurple",
          style)}
      />
    </div>
  );
};

export default TextBox;
