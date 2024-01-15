package com.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.domain.CommentDTO;
import com.spring.domain.ImageDTO;
import com.spring.domain.RestaurantDTO;
import com.spring.mapper.RestaurantMapper;

@Service
public class RestaurantServiceImpl implements RestaurantService {

	@Autowired
	private RestaurantMapper mapper;

	@Override
	public boolean insertRestaurant(RestaurantDTO dto) {
		
		int rno = mapper.getNextRno();
		dto.setRno(rno);
		
		if(dto.getImagePath()!=null) {
			ImageDTO imageDTO = new ImageDTO();
			imageDTO.setRno(rno);
			imageDTO.setUploadPath(dto.getImagePath());
			System.out.println("이미지패스 있음");
			mapper.createImage(imageDTO);
		}
		return mapper.insertRestaurant(dto)==1?true:false;
		
	}

	@Override
	public List<RestaurantDTO> resList() {
		return mapper.resList();
	}

	@Override
	public List<ImageDTO> imageList() {
		return mapper.imageList();
	}

	@Override
	public RestaurantDTO resInfo(int rno) {
		return mapper.resInfo(rno);
	}

	@Override
	public List<ImageDTO> resInfoImage(int rno) {
		return mapper.resInfoImage(rno);
	}

	@Override
	public boolean addComment(CommentDTO dto) {
		return mapper.addComment(dto)==1;
	}

	@Override
	public List<CommentDTO> resInfoComment(int rno) {
		return mapper.resInfoComment(rno);
	}

	@Override
	public List<CommentDTO> commentList() {
		return mapper.commentList();
	}

	

	

}
