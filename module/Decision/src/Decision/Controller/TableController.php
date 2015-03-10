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

        $router = $this->params()->fromRoute();
        $decisionId = $router['id'];
        $decision = $this->getEntityManager()->getRepository('Decision\Entity\ItmDecision')->findOneByDecisionId($decisionId);
        $parameters = $this->getEntityManager()->getRepository('Decision\Entity\ItmParameter')->findByParameterDecision($decisionId);
        $test = "pipou";
        $this->layout()->setTemplate('layout/layout');
        return new ViewModel(array(
            'decision' => $decision,
            'parameters' => $parameters
        ));

    }

    public function getEntityManager() {
        if (null === $this->em) {
            $this->em = $this->getServiceLocator()->get('doctrine.entitymanager.orm_default');
        }
        return $this->em;
    }
}