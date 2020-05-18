package com.example.microservices.webserver;


//Product class stores the product information retrieved from Product Catalog services
//This product list is passed to the view and rendered on the view

public class Products {
	
	
    private Long id;
	
	private String name;
	private String category;
	private int price;
	private String image;
	
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getPrice() {
		return price;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public void setPrice(int price) {
		this.price	= price;
	}
	@Override
	public String toString() {
		return "Employee [id=" + id + ", name=" + name + ", price=" + price  + "]";
	}
	
	
	
}

