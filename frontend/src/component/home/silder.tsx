import { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Slides = [
  {
    img: "https://media.istockphoto.com/id/1488294044/photo/businessman-works-on-laptop-showing-business-analytics-dashboard-with-charts-metrics-and-kpi.webp?b=1&s=170667a&w=0&k=20&c=BNF7gZ3XmCEf0_H8bUb6TLOvrDPVOmrEzbuu8FZrOao="
  },
  {
    img: "https://media.istockphoto.com/id/1488294044/photo/businessman-works-on-laptop-showing-business-analytics-dashboard-with-charts-metrics-and-kpi.webp?b=1&s=170667a&w=0&k=20&c=BNF7gZ3XmCEf0_H8bUb6TLOvrDPVOmrEzbuu8FZrOao="
  },
  {
    img: "https://media.istockphoto.com/id/1488294044/photo/businessman-works-on-laptop-showing-business-analytics-dashboard-with-charts-metrics-and-kpi.webp?b=1&s=170667a&w=0&k=20&c=BNF7gZ3XmCEf0_H8bUb6TLOvrDPVOmrEzbuu8FZrOao="
  },
  {
    img: "https://media.istockphoto.com/id/1488294044/photo/businessman-works-on-laptop-showing-business-analytics-dashboard-with-charts-metrics-and-kpi.webp?b=1&s=170667a&w=0&k=20&c=BNF7gZ3XmCEf0_H8bUb6TLOvrDPVOmrEzbuu8FZrOao="
  },
]

export default function SwiperSlider() {
  const progressCircle = useRef<any>(null);
  const progressContent = useRef<any>(null);
  const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper h-[calc(100vh-80px)]"
      >
        {
          Slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <img src={slide.img} className="w-full" alt="..." />
            </SwiperSlide>
          ))
        }
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
}
