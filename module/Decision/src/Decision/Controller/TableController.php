<?php
/**
 * Created by PhpStorm.
 * User: guillaumesoullard1
 * Date: 01/03/2015
 * Time: 17:44
 */

namespace Decision\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\Http\Response;

use Decision\Entity\ItmDecision;
use Decision\Entity\ItmParameter;

class TableController extends AbstractActionController{

    public function tableAction(){
        return new ViewModel();

    }
}