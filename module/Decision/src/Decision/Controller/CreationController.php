<?php
/**
 * Created by PhpStorm.
 * User: guillaumesoullard1
 * Date: 23/02/2015
 * Time: 19:55
 */
namespace Decision\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\Http\Response;

class CreationController extends AbstractActionController
{

    public function createAction()
    {
        return new ViewModel();
    }

    public function getParameterDataAction(){

        $request = $this->getRequest();
        $parameterData = array(
            "parameterName" => $request->getPost('parameterName'),
            //"parameterValue" => $request->getPost('parameterValue'),
            "parameterMinValue" => $request->getPost('parameterMinValue'),
            "parameterMaxValue" => $request->getPost('parameterMaxValue'),
            "parameterUnit" => $request->getPost('parameterUnit')
        );
        $response = new Response();
        $response->setContent(json_encode($parameterData));
        return $response;
    }
}