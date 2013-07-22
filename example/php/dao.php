<?php
include "config.php";

$con = mysql_connect($mydbhost, $mydbuser,$mydbpw);
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

mysql_close($con);
?>