package com.spring.controller;


import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import com.spring.domain.CommentDTO;
import com.spring.domain.ImageDTO;
import com.spring.domain.RestaurantDTO;
import com.spring.service.RestaurantService;

import lombok.extern.slf4j.Slf4j;

@Controller @Slf4j
public class HomeController {
	
		@Autowired
		private RestaurantService service;
		
		
		@GetMapping("/")
		public String home() {
			log.info("home요청");
			return "home";
		}
		@GetMapping("/home2")
		public String home2() {
			log.info("home요청");
			return "home2";
		}
		@GetMapping("/map")
		public String map(String location,Model model) {
			log.info("map");
			List<RestaurantDTO> list = service.resList();
			List<RestaurantDTO> list2 = new ArrayList<RestaurantDTO>();
			for (RestaurantDTO dto : list) {
				System.out.println(dto.getLocation());
				
				String afterFirstWord = dto.getLocation().substring(dto.getLocation().indexOf("대한민국") + 4);
				
				String[] words = afterFirstWord.split("\\s+");
				
				String word1 = words[1];
				String word2 = words[2];
				
				if(location.equals(word1+word2)) {
					list2.add(dto);
					System.out.println(list2);
				}
			}
			List<ImageDTO> imageList = service.imageList();
			if (imageList == null) {
			    imageList = new ArrayList<>();
			}
			List<CommentDTO> commentList = service.commentList();
			
			
			//댓글, 평점 restaurantDto에 대입
			Map<Integer, Long> commentCountMap = commentList.stream()
			    .collect(Collectors.groupingBy(CommentDTO::getRno, Collectors.counting()));
			Map<Integer, Double> scoreMap = commentList.stream()
				    .collect(Collectors.groupingBy(
				        CommentDTO::getRno,
				        Collectors.averagingInt(CommentDTO::getScore)
				    ));

			for (RestaurantDTO restaurantDTO : list2) {
			    int rno = restaurantDTO.getRno();
			    Long commentCount = commentCountMap.getOrDefault(rno, 0L); 
			    double score = Math.round(scoreMap.getOrDefault(rno, 0.0)* 10.0) / 10.0;
			    restaurantDTO.setCommentCount(commentCount.intValue()); 
			    restaurantDTO.setScore(score); 
			}
			System.out.println("리스트 맵");
			System.out.println(list2);
			model.addAttribute("commentList",commentList);
			model.addAttribute("imageList", imageList);
			model.addAttribute("list",list2);
			return "map";
		}
		
		@PostMapping("/addRestaurant")
		public String addRestaurant(RestaurantDTO dto) {
			System.out.println(dto);
			service.insertRestaurant(dto);
			return "home";
		}
		@PostMapping("/uploadImage")
		public ResponseEntity<ImageDTO> uploadImagePost(MultipartFile uploadImage) {
			log.info("upload요청");

			String uploadPath = "c:\\imageUpload";
			String uploadFolderPath = getFolder()+"\\image";
			File uploadFullPath = new File(uploadPath, uploadFolderPath);
			if (!uploadFullPath.exists()) {
				uploadFullPath.mkdirs();
			}

			ImageDTO dto = new ImageDTO();
			UUID uuid = UUID.randomUUID();
			String fileName = uuid.toString() + "_" + uploadImage.getOriginalFilename();
			//2023%5C10%5C16%5C95451881-2068-44a4-8e7a-79b372a0b91d_KakaoTalk_20230808_160509493_1202.jpg
			File saveFile = new File(uploadFullPath, fileName);

			dto.setImageName(uploadImage.getOriginalFilename());
			dto.setUploadPath(uploadFolderPath);
			dto.setUuid(uuid.toString());

			try {
				uploadImage.transferTo(saveFile);
					
			} catch (Exception e) {
				e.printStackTrace();
			}
			return new ResponseEntity<>(dto, HttpStatus.OK);
		}
		private String getFolder() {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

			Date date = new Date();
			String str = sdf.format(date);

			return str.replace("-", File.separator);
		}
		@GetMapping("/display")
		public ResponseEntity<byte[]> getFile(String fileName) {
			log.info("파일 요청 " + fileName);

			File file = new File("c:\\imageUpload\\" + fileName);

			ResponseEntity<byte[]> result = null;
			try {
				result = new ResponseEntity<byte[]>(FileCopyUtils.copyToByteArray(file), HttpStatus.OK);
			} catch (IOException e) {
				e.printStackTrace();
			}
			return result;
		}
		@GetMapping("/restaurantInfo")
		public String addRestaurant(int rno,Model model) {
			System.out.println(rno);
			RestaurantDTO dto = service.resInfo(rno);
			List<ImageDTO> list = service.resInfoImage(rno);
			List<CommentDTO> commentList = service.resInfoComment(rno);
			if (list == null) {
			    list = new ArrayList<>();
			}
			model.addAttribute("dto",dto);
			model.addAttribute("list",list);
			model.addAttribute("list2",commentList);
			return "restaurantInfo";
		}
		@PostMapping("/addComment")
		public String addComment(CommentDTO dto) {
			System.out.println(dto);
			service.addComment(dto);
			return "redirect:/restaurantInfo?rno=" + dto.getRno();
		}
}
