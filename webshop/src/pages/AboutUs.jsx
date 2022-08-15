
function AboutUs() {
  // ref-d

  const sendEmail = () => {
    window.Email.send({
      Host : "smtp.elasticemail.com",
      Username : "vahermihkel@gmail.com",
      Password : "8",
      To : 'vahermihkel@gmail.com',
      From : "vahermihkel@gmail.com",
      Subject : "Sulle tuli e-mail",
      Body : "And this is the body",
      // Body : `Sulle saatis e-maili ${nameRef.current.value} 
      //   (email: ${emailRef.current.value}), tema sõnumi sisu:
      //   ${messageRef.current.value}`
    }).then(
      message => alert(message)
    );
  }

  return ( 
    <div>
      {/* label + input */}
      <button onClick={sendEmail}>Saada meile e-mail</button>
    </div> );
}

export default AboutUs;