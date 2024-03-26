// 숙소 정보
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBath,
    faBed,
    faTshirt,
    faTv,
    faCouch,
    faHotTub,
    faUtensils,
    faPrint,
    faSink,
    faSwimmer,
    faHome,
    faPallet,
    faPersonThroughWindow
  } from "@fortawesome/free-solid-svg-icons";

const PropertyInfo = ({ propertyInfoData }) => {

  // 게시물 정보
  const { maximumOccupancy, photoInfoList, location, caption } = propertyInfoData;

  const roomIcons = {
    'balcony': faPersonThroughWindow,
    'bathroom': faBath,
    'bedroom': faBed,
    'dining_room': faUtensils,
    'living_room': faCouch,
    'kitchen': faUtensils
  };

  const amenityIcons = {
    'Bathtub': faBath,
    'Bed': faBed,
    'Closet': faTshirt,
    'Computer monitor': faTv,
    'Couch': faCouch,
    'Home appliance': faHome,
    'Jacuzzi': faHotTub,
    'Kitchen appliance': faUtensils,
    'Printer': faPrint,
    'Sink': faSink,
    'Sofa bed': faCouch,
    'Swimming pool': faSwimmer,
    'Table': faPallet,
    'Television': faTv,
  };

  // roomType, amenityTypes 카운트
  const countItems = (items) => {
    const count = {};
    items.forEach(item => {
      count[item] = (count[item] || 0) + 1;
    });
    return count;
  };

  // roomType, amenityTypes 배열 변환
  const roomTypes = photoInfoList ? photoInfoList.map(info => info.roomType) : [];
  const amenityTypes = photoInfoList ? [].concat(...photoInfoList.map(info => info.amenityTypes)) : [];

  const roomTypeCount = countItems(roomTypes);
  const amenityTypeCount = countItems(amenityTypes);

  return (
    <div style={{ color: '#666666' , marginTop: "-50px", marginBottom: "300px"}} >
      <p style={{ fontWeight: 'bold', fontSize: '50px', marginBottom: "10px" }}>{location}</p>
      <p style={{ fontWeight: 'bold', fontSize: '18px' }}>수용 가능 인원: {maximumOccupancy}명</p>
  
      <hr style={{ marginTop: '30px', borderColor: '#EEEEEE', borderWidth: '1px', width: '95%', marginLeft: '0', marginRight: 'auto' }} />
  
      <p style={{ fontWeight: 'bold', fontSize: '25px' }}>방 구성</p>
      {Object.entries(roomTypeCount).map(([type, count]) => {
        if (type === 'exterior' || type === 'swimming_pool') {
          return null;
        }
        return (
          <p style={{ fontSize: '18px' }} key={type}>
            <FontAwesomeIcon icon={roomIcons[type]} /> {type} {count}개
          </p>
        );
      })}
  
      <hr style={{ marginTop: '30px', borderColor: '#EEEEEE', borderWidth: '1px', width: '95%', marginLeft: '0', marginRight: 'auto' }} />
      
      <p style={{ fontWeight: 'bold', fontSize: '25px' }}>편의 시설(용품)</p>
      {Object.entries(amenityTypeCount).map(([type, count]) => (
        <p style={{ fontSize: '18px' }} key={type}>
            <FontAwesomeIcon icon={amenityIcons[type]} /> {type} {count}개
        </p>
      ))}
  
      <hr style={{ marginTop: '30px', borderColor: '#EEEEEE', borderWidth: '1px', width: '95%', marginLeft: '0', marginRight: 'auto' }} />
      <p style={{ fontWeight: 'bold', fontSize: '25px' }}>소개글</p>
      <p>{caption}</p>
    </div>
  );
}

export default PropertyInfo;
