<?php
/**
 * Created by PhpStorm.
 * User: guillaumesoullard1
 * Date: 21/02/2015
 * Time: 00:55
 */

namespace Decision\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\Json;

class ChartsController extends AbstractActionController
{
    public function indexAction()
    {
        $this->layout()->setTemplate('layout/layout-chart');
        return new ViewModel();
        //return Zend_Json::encode(array('redirect' => '/Decision/ChartsController/index'));
    }

}