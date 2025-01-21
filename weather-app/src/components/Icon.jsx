export default function Icon({ icon }) {
  return (
    <>
      {icon ? (
        <img className='weather-icon' src={icon} alt="Weather Icon" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "5px 0",
          width: "35px",
          height: "auto",
        }}></img>
      ) :
        (<></>)}
    </>
  )
}