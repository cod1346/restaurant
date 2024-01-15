package com.spring.domain;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class RestaurantDTO {
	private int rno;
	private String name;
	private String location;
	private String lat;
	private String lng;
	private String imagePath;
	private String tel;
	private int commentCount;
	private double score;
}


















