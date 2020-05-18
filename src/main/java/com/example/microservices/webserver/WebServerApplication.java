package com.example.microservices.webserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableDiscoveryClient
@ComponentScan(useDefaultFilters = false)
public class WebServerApplication {

	public static final String PRODUCT_SERVICE_URL = "http://CATALOG-SERVICE";
	 

	
	public static void main(String[] args) {
		SpringApplication.run(WebServerApplication.class, args);
	}
	
	@Bean
	public WebServerController homeController() {
		return new WebServerController();
	}
	@Bean
	 @LoadBalanced
	 public RestTemplate restTemplate() {
	  return new RestTemplate();
	 }
	
	@Bean
	public ProductCatalogService catalogService() {
		return new ProductCatalogService(PRODUCT_SERVICE_URL);
	}

}
