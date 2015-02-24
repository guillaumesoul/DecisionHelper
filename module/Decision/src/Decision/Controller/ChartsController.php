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

class ChartsController extends AbstractActionController
{
    public function indexAction()
    {
        return new ViewModel();
    }

}