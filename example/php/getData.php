<?php
	include "config.php";
	$con = mysql_connect($mydbhost, $mydbuser,$mydbpw);
	if (!$con){
	  die('Could not connect: ' . mysql_error());
	}
	
	mysql_select_db($mydbname, $con);
	$result = mysql_query("SELECT * FROM task");
	
	$arr_data = array();
	
	while($row = mysql_fetch_array($result)){
	  $arr_data[] = array('data' => 
						array('id'=>$row['id'],
						'title'=>$row['title'],
						'description'=>$row['content'],
						'pid'=>$row['pid'],
						'prev'=>$row['prev'],
						'next'=>$row['next']
						)
					);
	}
	
	//print_r($arr_data);
	$json_string = json_encode($arr_data);  
	echo $json_string; 
		
	mysql_close($con);
?>