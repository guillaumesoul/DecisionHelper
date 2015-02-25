<?php

namespace Decision\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ItmDecision
 *
 * @ORM\Table(name="itm_decision")
 * @ORM\Entity
 */
class ItmDecision
{
    /**
     * @var integer
     *
     * @ORM\Column(name="decision_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $decisionId;

    /**
     * @var string
     *
     * @ORM\Column(name="decision_name", type="string", length=45, nullable=true)
     */
    private $decisionName;

    /**
     * @var string
     *
     * @ORM\Column(name="decision_creattion_date", type="string", length=45, nullable=true)
     */
    private $decisionCreattionDate;

    /**
     * @var string
     *
     * @ORM\Column(name="decision_author_id", type="string", length=45, nullable=true)
     */
    private $decisionAuthorId;



    /**
     * Get decisionId
     *
     * @return integer 
     */
    public function getDecisionId()
    {
        return $this->decisionId;
    }

    /**
     * Set decisionName
     *
     * @param string $decisionName
     * @return ItmDecision
     */
    public function setDecisionName($decisionName)
    {
        $this->decisionName = $decisionName;

        return $this;
    }

    /**
     * Get decisionName
     *
     * @return string 
     */
    public function getDecisionName()
    {
        return $this->decisionName;
    }

    /**
     * Set decisionCreattionDate
     *
     * @param string $decisionCreattionDate
     * @return ItmDecision
     */
    public function setDecisionCreattionDate($decisionCreattionDate)
    {
        $this->decisionCreattionDate = $decisionCreattionDate;

        return $this;
    }

    /**
     * Get decisionCreattionDate
     *
     * @return string 
     */
    public function getDecisionCreattionDate()
    {
        return $this->decisionCreattionDate;
    }

    /**
     * Set decisionAuthorId
     *
     * @param string $decisionAuthorId
     * @return ItmDecision
     */
    public function setDecisionAuthorId($decisionAuthorId)
    {
        $this->decisionAuthorId = $decisionAuthorId;

        return $this;
    }

    /**
     * Get decisionAuthorId
     *
     * @return string 
     */
    public function getDecisionAuthorId()
    {
        return $this->decisionAuthorId;
    }
}
