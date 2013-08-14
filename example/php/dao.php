<?php
include "config.php";

$con = mysql_connect($mydbhost, $mydbuser,$mydbpw);
mysql_query('SET NAMES utf8');
if (!$con){
  die('Could not connect: ' . mysql_error());
}
mysql_select_db($mydbname, $con);

$action = $_POST['action'];

if($action == 'add'){
	$title = $_POST['title'];
	$content = $_POST['content'];
	$sql = "INSERT INTO `task` (`title`, `content`) VALUES ('$title','$content')";
	$result = mysql_query($sql,$con);
	if (!$result){
	   echo false;
	}
	else{
	   echo true;
	}		
}

if($action == 'del'){
	$id = $_POST['id'];
    $sql = "delete from task where id = '$id'";
    $result = mysql_query($sql);
    if((mysql_affected_rows()==0)||(mysql_affected_rows()==-1)){
        echo false;
    }else{
    	echo true;
    } 
}

if($action == 'update'){
	$id = $_POST['id'];
	$field = $_POST['field'];
	$new_val = $_POST['new_val'];
	$sql = "UPDATE task SET $field = '$new_val' WHERE id = '$id'";
    $result = mysql_query($sql);
    if((mysql_affected_rows()==0)||(mysql_affected_rows()==-1)){
        echo false;
    }else{
    	echo true;
    } 
}

if($action == 'sel'){
	$currentPage = $_POST['currentPage'];
	$pageSize = $_POST['pageSize'];
	$begin = ($currentPage-1)*$pageSize;
	$end = $currentPage*$pageSize;
	$sql = "select * from task LIMIT $begin,$end;";
    $result = mysql_query($sql);
	
    if((mysql_affected_rows()==0)||(mysql_affected_rows()==-1)){
        echo false;
    }else{
		$arr_data = array();
		
		while($row = mysql_fetch_array($result)){
		  $arr_data[] = array('data' => 
							array('id'=>$row['id'],
							'title'=>$row['title'],
							'content'=>$row['content'],
							'pid'=>$row['pid'],
							'prev_id'=>$row['prev_id'],
							'next_id'=>$row['next_id']
							)
						);
		}
		
		//print_r($arr_data);
		$json_string = json_encode($arr_data);  
		echo $json_string; 
    } 
}


if($action == 'selTemp'){
	$currentPage = $_POST['currentPage'];
	$pageSize = $_POST['pageSize'];
	$begin = ($currentPage-1)*$pageSize;
	$end = $currentPage*$pageSize;
	

	$json = $_POST['selData'];
	
	foreach($json as $item) {
		$field = $item['field'];
		$condition = $item['condition'];
		$value = $item['value'];
	}
	if($condition == "include"){
		$sql = "SELECT * FROM  `task` where ".$field." LIKE '%三%' LIMIT $begin,$end;";
	}else{
		$sql = "SELECT * FROM  `task` where $field $condition '$value' LIMIT $begin,$end;";	
	}

    $result = mysql_query($sql);
	
    if((mysql_affected_rows()==0)||(mysql_affected_rows()==-1)){
        echo false;
    }else{
		$arr_data = array();
		
		while($row = mysql_fetch_array($result)){
		  $arr_data[] = array('data' => 
							array('id'=>$row['id'],
							'title'=>$row['title'],
							'content'=>$row['content'],
							'pid'=>$row['pid'],
							'prev_id'=>$row['prev_id'],
							'next_id'=>$row['next_id']
							)
						);
		}
		
		//print_r($arr_data);
		$json_string = json_encode($arr_data);  
		echo $json_string; 
    } 
}

mysql_close($con);
?>