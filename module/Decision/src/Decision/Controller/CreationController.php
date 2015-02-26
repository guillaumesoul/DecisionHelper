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

use Decision\Entity\ItmDecision;
use Decision\Entity\ItmParameter;

class CreationController extends AbstractActionController
{

    /**
     * @var Doctrine\ORM\EntityManager
     */
    protected $em;

    public function createAction()
    {
        return new ViewModel();
    }

    public function getParameterDataAction(){

        $request = $this->getRequest();
        $parameterData = array(
            "parameterName" => $request->getPost('parameterName'),
            "parameterMinValue" => $request->getPost('parameterMinValue'),
            "parameterMaxValue" => $request->getPost('parameterMaxValue'),
            "parameterUnit" => $request->getPost('parameterUnit')
        );
        $response = new Response();
        $response->setContent(json_encode($parameterData));
        return $response;
    }

    public function decisionCreateAction(){
        $request = $this->getRequest();
        $decisionData = array(
            "decisionName" => $request->getPost('decisionName'),
            "parametersData" => $request->getPost('parametersData')
        );

        $decision = new ItmDecision();
        $em = $this->getEntityManager();
        $repo = $this->getEntityManager()->getRepository('Decision\Entity\ItmParameter');

        $parameter = new ItmParameter();
        $parameter->setParameterName("test persist");
        $em->persist($parameter);

        $response = new Response();
        return $response;
    }

    public function getEntityDevwinManager() {
        if (null === $this->em) {
            $this->em = $this->getServiceLocator()->get('doctrine.entitymanager.orm_default');
        }
        return $this->em;
    }
}