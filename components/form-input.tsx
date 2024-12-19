interface formInputProps {
    name: string,
    type: string,
    placeholder: string,
    required: boolean,
    errors: string[],
}

export default function FormInput({name, type, placeholder, required, errors}: formInputProps) {
    return (
        <div>
            <input 
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
                defaultValue=""
                className="w-full h-8 border border-1 border-solid border-gray-300 rounded-2xl focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-gray-400 p-1 pl-10"/>

            {errors.map((error, index) => (
                <span key={index} className="text-red-500 font-medium">
                    {error}
                </span>
            ))}
       </div>
    )
}