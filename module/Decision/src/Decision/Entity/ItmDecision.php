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
     * @return int
     */
    public function getDecisionId()
    {
        return $this->decisionId;
    }

    /**
     * @param int $decisionId
     */
    public function setDecisionId($decisionId)
    {
        $this->decisionId = $decisionId;
    }

    /**
     * @return string
     */
    public function getDecisionName()
    {
        return $this->decisionName;
    }

    /**
     * @param string $decisionName
     */
    public function setDecisionName($decisionName)
    {
        $this->decisionName = $decisionName;
    }

    /**
     * @return string
     */
    public function getDecisionCreattionDate()
    {
        return $this->decisionCreattionDate;
    }

    /**
     * @param string $decisionCreattionDate
     */
    public function setDecisionCreattionDate($decisionCreattionDate)
    {
        $this->decisionCreattionDate = $decisionCreattionDate;
    }

    /**
     * @return string
     */
    public function getDecisionAuthorId()
    {
        return $this->decisionAuthorId;
    }

    /**
     * @param string $decisionAuthorId
     */
    public function setDecisionAuthorId($decisionAuthorId)
    {
        $this->decisionAuthorId = $decisionAuthorId;
    }


}
