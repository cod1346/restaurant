let map, infoWindow,markers=[];

function initMap() {
  
  var lat = ""
  var lng = ""
  if(document.querySelector(".res-data")){
    map = new google.maps.Map(document.getElementById("map"), {
      center: { 
          lat: parseFloat(document.querySelector(".res-data").dataset.lat), lng: parseFloat(document.querySelector(".res-data").dataset.lng) 
        },
      zoom: 12,
    })
  }else{
    map = new google.maps.Map(document.getElementById("map"), {
      center: { 
          lat:37.413294 , lng: 127.269311
        },
      zoom: 7,
    })
  }
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  markerList()

  locationButton.textContent = "현위치 찾기";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("현위치");
          infoWindow.open(map);
          map.setCenter(pos);
          map.setZoom(13);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
  
  // 지도 클릭 이벤트 리스너 추가
  map.addListener('click', function(event) {
    markers.forEach(marker => {
        marker.setMap(null); // 이전 마커 삭제
    });
    
    newMarker(event.latLng); // 클릭한 위치에 새로운 마커 표시
    showInfoWindow(event.latLng, map); // 말풍선 표시
    
    markerList(); // 새로운 마커 목록 생성
  });
}



function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "위치정보시스템에러"
      : "위치정보시스템 지원안함"
  );
  infoWindow.open(map);
}
function newMarker(location) {
    const marker = new google.maps.Marker({
        position: location,
        map: map
      });
    
      markers.push(marker);
    }

// function placeMarker(location,name) {
//     marker = new google.maps.Marker({
//       position: location,
//       map: map
//     });
//     infoWindow = new google.maps.InfoWindow({
//         content: "<a href='/'>"+name+"</a>",
//     });

//     marker.addListener('click', () => {
//         infoWindow.open(map, marker);
//     });
//   }
function updateInfoWindow(marker, content) {
  const infoWindow = new google.maps.InfoWindow({
    content: content
  });

  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
}

function showInfoWindow(location, map) {
    const latitude = location.lat();
    const longitude = location.lng();
    infoWindow.setContent("<button class='add-res-btn' onclick='clickInfo(" + latitude + "," + longitude + ")'>맛집등록하기</button>");
    infoWindow.setPosition(location);
    infoWindow.open(map); // 말풍선 열기
}

function clickInfo(lat,lng){
    console.log("버튼클릭")
    console.log(lat)
    console.log(lng)
    const geocoder = new google.maps.Geocoder();

    // 위도와 경도를 담은 LatLng 객체 생성
    const latlng = new google.maps.LatLng(lat, lng);

    // 주소 변환 요청
    geocoder.geocode({ 'location': latlng }, (results, status) => {
        if (status === 'OK') {
            
            if (results[0]) {
                console.log(results[0].formatted_address);
                document.querySelector(".res-location").value=results[0].formatted_address
            } else {
                console.log('주소 정보가 없습니다.');
            }
        } else {
            console.log('Geocoder 실패: ' + status);
        }
    });
    
    document.querySelector(".modal-lng").value=lng
    document.querySelector(".modal-lat").value=lat
    document.querySelector(".modal-btn").click()

}

document.querySelector(".submit-btn").addEventListener("click",()=>{
    if(document.querySelector(".res-name").value==""||document.querySelector(".res-tel").value==""){
        alert("기입을 완료해주세요.")
    }else{
        document.querySelector(".res-location").value+=" "+document.querySelector(".detail-location").value
        console.log(document.querySelector(".res-location").value)
        const li = document.querySelector(".uploadResult ul li");
        if (li) {
          let fileCallPath = encodeURIComponent(
              li.dataset.path + "\\" + li.dataset.uuid+ "_" + li.dataset.filename
              );
          document.querySelector("#form").insertAdjacentHTML("beforeend","<input type = 'hidden' name='imagePath'"+"value='"+fileCallPath+"'/>")
        }
        document.querySelector("#form").submit()
    }
})
document.querySelector(".uploadImage").addEventListener("change", () => {
	let targetFile=""
	const formData = new FormData();
	
	let inputFiles = document.querySelector(".uploadImage").files;
	console.log(inputFiles);
	
	let firstFile = inputFiles[0];
	formData.append("uploadImage", firstFile);
	
	console.log(formData);

	  fetch("/uploadImage", {
	    method: "post",
	    body: formData,
	  })
	    .then((response) => {
	      if (!response.ok) {
	        throw new Error("파일 업로드 실패");
	      }
	      return response.json();
	    })
	    .then((data) => {
	      console.log(data);
	      showUploadedFile(data);
	      document.querySelector(".uploadResult ul").insertAdjacentHTML("beforeend", showUploadedFile(data));
	    })
	    .catch((error) => console.log(error));
	  });
    function showUploadedFile(uploadResultArr) {
      let str = "";
      if (!Array.isArray(uploadResultArr)) {
          uploadResultArr = [uploadResultArr];
        }
    
      uploadResultArr.forEach((uploadResult) => {
          
      let fileCallPath = encodeURIComponent(
        uploadResult.uploadPath + "\\" + uploadResult.uuid + "_" + uploadResult.imageName
          );
    
      str += "<li data-path='" + uploadResult.uploadPath + "'data-uuid='" + uploadResult.uuid + "'";
      str += " data-filename='" + uploadResult.imageName + "'>";
      str +=
        "<div><img src='/display?fileName=" + fileCallPath + "' style='width: 50px;'></div>";
      str += "<small>" + uploadResult.imageName + "</small> ";
      str += "</li>";
      })
      return str;
      //document.querySelector(".uploadResult ul").insertAdjacentHTML("beforeend", str);
    }
    
function markerList(){
    document.querySelectorAll(".res-data").forEach(e=>{
        console.log(e)
        // 전달된 데이터를 반복하여 마커 생성
        const lat = e.dataset.lat;
        const lng = e.dataset.lng;
        const rno = e.dataset.rno;
        const name = e.dataset.name;
        const location = new google.maps.LatLng(lat, lng);

        newMarker(location);
        const marker = markers[markers.length - 1];
        updateInfoWindow(marker, `<a href='/restaurantInfo?rno=${rno}' class='icon-link icon-link-hover' style='--bs-link-hover-color-rgb: 25, 135, 84;'>${name}</a>`);
        // Show info window on marker click
        marker.addListener('click', () => {
          showInfoWindow(location);
        });
      });
    }

document.querySelectorAll(".res-data").forEach(btn => {
    btn.addEventListener("click", function() {
      const lat = parseFloat(this.dataset.lat);
      const lng = parseFloat(this.dataset.lng);
      const name = this.dataset.name;
      const rno = this.dataset.rno;
      
      const location = new google.maps.LatLng(lat, lng);
      map.setCenter(location); // 해당 마커로 지도 이동
      map.setZoom(15);
      // 해당 마커 생성
      const marker = new google.maps.Marker({
        position: location,
        map: map
      });
  
      // 해당 마커에 인포윈도우 표시
      const infoWindow = new google.maps.InfoWindow({
        content: `<a href='/restaurantInfo?rno=${rno}' class='icon-link icon-link-hover' style='--bs-link-hover-color-rgb: 25, 135, 84;'>${name}</a>`
      });
  
      infoWindow.open(map, marker);
    });
  });



  