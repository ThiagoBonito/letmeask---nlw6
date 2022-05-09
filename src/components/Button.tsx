import {ButtonHTMLAttributes} from 'react';
import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean;
};
// rest operator, serve para pegar o resto, como no caso abaixo, foi separado de dentro do props a propriedade
// isOutlined, e as outras propriedades continuarão dentro de props
export function Button({isOutlined = false, ...props}: ButtonProps){
     return(
         <button className={`button ${isOutlined ? 'outlined' : ''}`} {...props}/>
     )
}
