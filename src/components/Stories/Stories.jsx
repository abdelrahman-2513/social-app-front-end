import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./Stories.css";
// components -.....................................
import UserStory from "./UserStory";

function Stories() {
  const storiesData = [
    "https://tse3.mm.bing.net/th?id=OIP.XqO6cETFqVBVcTHoDrdybAHaIs&pid=Api&P=0&h=220",
    "https://images.ctfassets.net/81iqaqpfd8fy/2I4f6dYslqoWI4YuqSUiE0/a4e6a82ded5d0885157d13902c5a531c/Smiling_Girl.jpg?w=1200&h=1200&fm=jpg&fit=fill",
    "https://internationalaffairsbd.com/wp-content/uploads/2017/09/5107183878_4c5a991bf1_b.jpg",
    "https://tse2.mm.bing.net/th?id=OIP.50_NOiTMkD5D1ga-WJEr3AHaHa&pid=Api&P=0&h=220",
    "https://tse2.mm.bing.net/th?id=OIP.KcYa44fN5F9yqGGXRyVM4gHaLI&pid=Api&P=0&h=220",
  ];
  return (
    <div className="stories">
      <UserStory />
      <Swiper style={{ width: "80%" }} slidesPerView={4} spaceBetween={15}>
        {storiesData.map((stor, i) => (
          <SwiperSlide key={i}>
            <div className="story">
              <div className="user">
                <img src="/vite.svg" alt={`user-${i}`} />
              </div>
              <img src={stor} alt="story-data" />
              <h4>{`User-${i}`}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Stories;
