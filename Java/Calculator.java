import java.util.HashMap;
import java.util.List;

import dbdemo.DataMapper;

import java.util.Arrays;

public class Calculator {
	private static DataMapper dMapper;
	private static List<HashMap<List<Integer>, List<Integer>>> mapList;
	private static HashMap<List<Integer>, List<Integer>> drive;
	private static HashMap<List<Integer>, List<Integer>> field;
	private static HashMap<List<Integer>, List<Integer>> punt;
	
	Calculator() {
		dMapper = new DataMapper();
		mapList = dMapper.getMaps();
		drive = mapList.get(0);
		field = mapList.get(0);
		punt = mapList.get(0);
	}
	
	public static void main(String[] args) {
		Calculator cal = new Calculator();
		int play = cal.calculation(Arrays.asList(1, 50));
		System.out.println(play);
	}
	
	public int calculation(List<Integer> key) {
	   	 if(key.size() != 2 && drive.isEmpty() && punt.isEmpty() && field.isEmpty()){
	   		 return -1;
	   	 }   			 
	   	 
	   	 int[] expectedPoints = new int[3];
	   	 expectedPoints[0]= 7*drive.get(key).get(0)/drive.get(key).get(1);
	   	 expectedPoints[1]= 0*punt.get(key).get(0)/punt.get(key).get(1);//not sure about this so we kept it
	   	 expectedPoints[2]= 3*field.get(key).get(0)/field.get(key).get(1);
	   	 
	   	 int indexOfHighest = 0;
	   	 if(expectedPoints[indexOfHighest] < expectedPoints[1]){
	   		 indexOfHighest =1;
	   	 }
	   	 if(expectedPoints[indexOfHighest] < expectedPoints[2]){
	   		 indexOfHighest =2;
	   	 }   	 
	   	 
	   	 return indexOfHighest;
	}

	public void calc2(){
		String[] output = new String[100];
		output[0] = "Yardline,";
		for(int x = 0; 15 > x;x++){
		   	output[0] = output[0] + "4th & " + x + ": GFI,"
		   				 		+ "4th & " + x + ": P,"
		   				 		+ "4th & " + x + ": FG,";
		}
		
		for(int yardline = 0; 100 > yardline;yardline++){
			output[yardline] = yardline + ",";
		   		 
		   	for(int distance = 0; 15 > distance;distance++){   			 
		   		List<Integer> temp = Arrays.asList(distance, yardline);
		   		calculation(temp);
		   			 
		   			 
		   	}
		}
	 
		   	 
		String hi = "Yard Line,";
	  	for(int x = 0; 45 > x;x++){
	  		String temp = "4th &" + x;
		}   					 
	   	 
	}
	    
	/*
	This method accepts the HashMaps for the Drive, Punt, and Field Goal data.
	It is assumped that each of these Hashmaps will be Integer Lists with the
	key being (distance, yardline) and val is (sum, n).
	    
	Some invalid inputs will return with -1.
	    
	It calculated the expectedPoints for each of the three plays, and returns an
	index to the best play that will probably lead to the best score  
	*/
	public static int expectedPoints(int points, List<Integer> key, HashMap<List<Integer>, List<Integer>> play){

	   	 return points * play.get(key).get(0)/play.get(key).get(1);

	}
	
}
