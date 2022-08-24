import Carousel from 'react-bootstrap/Carousel';

function CarouselGallery() {
  const images = [
    {src: "https://picsum.photos/id/237/500/200", alt: "First slide", header: "First slide label", text: "Nulla vitae elit libero, a pharetra augue mollis interdum."},
    {src: "https://picsum.photos/id/337/500/200", alt: "Second slide", header: "Second slide label", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
    {src: "https://picsum.photos/id/437/500/200", alt: "Third slide", header: "Third slide label", text: "Praesent commodo cursus magna, vel scelerisque nisl consectetur."}  
  ]
  // const [images, setImages] = useState([]);

  // useEffect(() => {
  //   fetch("https://react722-default-rtdb.europe-west1.firebasedatabase.app/images.json")
  //     .then(res => res.json())
  //     .then(data => setImages(data || []))
  // }, []);


  return ( 
    <Carousel>
      { images.map( element => <Carousel.Item key={element.src}>
        <img
          src={element.src}
          alt={element.alt}
        />
        <Carousel.Caption>
          <h3>{element.header}</h3>
          <p>{element.text}</p>
        </Carousel.Caption>
      </Carousel.Item> )}
    </Carousel>
   );
}

export default CarouselGallery;