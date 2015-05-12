<?php
 file_put_contents("request.txt",json_encode($_REQUEST));
 header('Content-Type: application/json');
 
    $users[0] = array('name' => 'Petro', 'id' => 007);
    $users[1] = array('name' => 'Andrew', 'id' => 01);    
    $users[2] = array('name' => 'Ihor', 'id' => 02);  
    $users[3] = array('name' => 'Katya', 'id' => 03);
    
 function isValidUser($users,$userName){  
    for($i=0; $i<count($users);$i++)
        {
           if($users[$i]['name'] == $userName)
           {
               $result = array(
                   'status' => true,
                   'data' => array(
                   'name'=> $users[$i]['name']
                   )
                   );
                return $result;   
           }
        }
        return $result = array('status' => false);
 };
 
  function getUserId($users,$userName){  
    for($i=0; $i<count($users);$i++)
        {
           if($users[$i]['name'] == $userName) {
               $result = array(
                   'data' =>
                   array(
                   'id' =>$users[$i]['id']
                   )
               );
               return $result;
           }

        }
    };
 
 
 $action = $_GET['action'];
 $userName = $_GET['userName'];  

 if($action == "validateUser")
 {
    $response = isValidUser($users,$userName);
 }
 else if($action == "getUserId")
 {
     $response = getUserId($users,$userName);
 }
echo json_encode($response);

  