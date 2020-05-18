package com.example.microservices.webserver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class WebServerController {
	@Autowired
	protected ProductCatalogService pdtCatalogService;
	
	@RequestMapping("home")
	public String getProducts(Model model) {
		
		
		Products[] pdt =  pdtCatalogService.getProducts();		
		model.addAttribute("products",pdt);
				
		return "home";
	}
	
	@RequestMapping("cart")
	public String showCart(Model model) {
				
		return "cart";
	}
}
