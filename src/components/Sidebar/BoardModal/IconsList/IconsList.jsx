const IconsList = ({icons=[]}) => {
  return (
    <ul>{icons.map((icon, idx)=>{
        return <li key={idx}>{icon}</li>
    })}
        </ul>
  )
}
export default IconsList