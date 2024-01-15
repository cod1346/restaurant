package com.spring.service;

import java.util.List;

import com.spring.domain.CommentDTO;
import com.spring.domain.ImageDTO;
import com.spring.domain.RestaurantDTO;

public interface RestaurantService {
	public boolean insertRestaurant(RestaurantDTO dto);
	public List<RestaurantDTO> resList();
	public List<ImageDTO> imageList();
	public RestaurantDTO resInfo(int rno);
	public List<ImageDTO> resInfoImage(int rno);
	public boolean addComment(CommentDTO dto);
	public List<CommentDTO> resInfoComment(int rno);
	public List<CommentDTO> commentList();
}
