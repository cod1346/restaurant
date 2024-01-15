package com.spring.mapper;

import java.util.List;

import com.spring.domain.CommentDTO;
import com.spring.domain.ImageDTO;
import com.spring.domain.RestaurantDTO;

public interface RestaurantMapper {
	public int insertRestaurant(RestaurantDTO dto);
	public List<RestaurantDTO> resList();
	public int createImage(ImageDTO dto);
	public int getNextRno();
	public List<ImageDTO> imageList();
	public RestaurantDTO resInfo(int rno);
	public List<ImageDTO> resInfoImage(int rno);
	public List<CommentDTO> resInfoComment(int rno);
	public int addComment(CommentDTO dto);
	public List<CommentDTO> commentList();
}
