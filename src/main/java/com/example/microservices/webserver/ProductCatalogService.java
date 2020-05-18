package com.example.microservices.webserver;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

//Class to call product catalog service. Product catalog service gets the list of products
//from MS Access Database. This list is then passed to Home.html and rendered in the view

@Service
public class ProductCatalogService {

	@Autowired
	@LoadBalanced
	protected RestTemplate restTemplate;

	protected String serviceUrl;

	protected Logger logger = Logger.getLogger(ProductCatalogService.class
			.getName());

	public ProductCatalogService(String serviceUrl) {
		this.serviceUrl = serviceUrl.startsWith("http") ? serviceUrl
				: "http://" + serviceUrl;
		System.out.println(this.serviceUrl);
	}

	public Products[] getProducts() {
		System.out.println(serviceUrl);	
		ResponseEntity<Products[]> response =
				  restTemplate.getForEntity(serviceUrl + "/Catalog",
						  Products[].class);
		Products[] Product = response.getBody();
		return Product;
	}
	
}
