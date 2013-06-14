<?php
include "config.php";

$con = mysql_connect($mydbhost, $mydbuser,$mydbpw);
if (!$con){
  die('Could not connect: ' . mysql_error());
}

mysql_select_db($mydbname, $con);

$sql = "INSERT INTO `task` (`title`, `content`) VALUES
('这是一个标题1','内容来了')";

mysql_query($sql,$con);

mysql_close($con);
?>