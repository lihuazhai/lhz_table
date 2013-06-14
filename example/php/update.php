<?php
include "config.php";

/*$con = mysql_connect($mydbhost, $mydbuser,$mydbpw);
if (!$con){
  die('Could not connect: ' . mysql_error());
}

mysql_select_db($mydbname, $con);*/

$title = $_GET('title');
$content = $_GET('content');

echo $title;

//$sql = "INSERT INTO `task` (`title`, `content`) VALUES ($title1',$content')";

//mysql_query($sql,$con);

//mysql_close($con);
?>