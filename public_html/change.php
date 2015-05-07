<?php
 file_put_contents("request.txt",json_encode($_REQUEST));
// fopen("file.txt");
// echo dirname(__FILE__)."/request.txt";
 $users[0] = array('name' => 'Petro', 'id' => 0);
 $users[1] = array('name' => 'Andrew', 'id' => 1);    
 $users[2] = array('name' => 'Ihor', 'id' => 2);  
 $users[3] = array('name' => 'Katya', 'id' => 3);
 
 $result = array(
     'name' => null,
     'status' => 'error',
     'valid' => false,
     'id' => null);
 
 $action = $_GET['action'];

 if($action == "validateUser")
 {
    $userName = $_GET['userName'];  
    
    for($i=0; $i<count($users);$i++)
    {
       if($users[$i]['name'] == $userName)
       {
        $result = array(
        'name' => $userName,
        'status' => "success",
        'valid' => true,
         'id' => $users['id']
            );
            break;
       }
    }

//    $isValid = in_array($userName,$array['name']);
//    $result = array(
//        'name' => $userName,
//        'status' => $isValid?"success":"error",
//        'valid' => $isValid
//    );
//     
 }
 
 
 else if($action == "getId")
 {
    for($i=0; $i<count($users);$i++)
    {
       if($users[$i]['name'] == $userName)
       {
        $result = array(
        'name' => $userName,
        'status' => "success",
        'valid' => true,
         'id' => $users['id']
            );
            break;
       }
    }
 }
 header('Content-Type: application/json');
 echo json_encode($result);
?>