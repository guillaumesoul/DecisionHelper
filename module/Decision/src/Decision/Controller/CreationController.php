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
use Decision\Entity\Test;

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

        $em = $this->getEntityManager();

        $decision = new ItmDecision();
        $decision->setDecisionAuthorId("author");
        $decision->setDecisionName($decisionData['decisionName']);
        $decision->setDecisionCreattionDate("date de creation");

        $em->persist($decision);

        foreach ($decisionData['parametersData'] as $parameterData){
            $parameter = new ItmParameter();
            $parameter->setParameterName($parameterData[0]);
            $parameter->setParameterMinValue($parameterData[1]);
            $parameter->setParameterMaxValue($parameterData[2]);
            $parameter->setParameterUnit($parameterData[3]);
            $parameter->setParameterDecision($decision);
            $em->persist($parameter);
        }

        $em->flush();

        $response = new Response();
        $decisionId = $decision->getDecisionId();
        $response = json_encode($decisionId);
        return $response;
    }

    public function persistanceAction(){

        /*$test = new Test();
        $test->setNom("nom test");
        $em = $this->getEntityManager();
        $em->persist($test);
        $em->flush();*/

        $decision = new ItmDecision();
        $decision->setDecisionAuthorId("dsd");
        $decision->setDecisionName("decision a");
        $decision->setDecisionCreattionDate("now");

        $parameter1 = new ItmParameter();
        $parameter2 = new ItmParameter();
        $parameter1->setParameterName("t1");
        $parameter1->setParameterDecision($decision);
        $parameter2->setParameterName("t2");
        $parameter2->setParameterDecision($decision);


        $em = $this->getEntityManager();
        $em->persist($decision);
        /*$em->persist($parameter1);
        $em->persist($parameter2);*/
        $em->flush();

        return "pipou";
    }

    public function tableAction(){
        return new ViewModel();

    }

    public function getEntityManager() {
        if (null === $this->em) {
            $this->em = $this->getServiceLocator()->get('doctrine.entitymanager.orm_default');
        }
        return $this->em;
    }
}