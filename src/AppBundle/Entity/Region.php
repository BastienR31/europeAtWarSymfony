<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Region
 *
 * @ORM\Table(name="ew_region")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\RegionRepository")
 */
class Region
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    protected $name;
    
    /**
     * @var int 
     * 
     * @ORM\Column(name="population_base", type="integer")
     */
    protected $population_base;
    
    /**
     * @var int 
     * 
     * @ORM\Column(name="wealth_base", type="integer")
     */
    protected $wealth_base;
    
    /**
     * One Region has One Faction.
     * @ORM\OneToOne(targetEntity="Faction")
     * @ORM\JoinColumn(name="faction_id", referencedColumnName="id")
     */
    protected $idFaction;
    
    /**
     * One Region has One Religion.
     * @ORM\OneToOne(targetEntity="Religion")
     * @ORM\JoinColumn(name="religion_id", referencedColumnName="id")
     */
    protected $idReligion;
    
    /**
     * One Region has One Faction.
     * @ORM\OneToOne(targetEntity="Resource")
     * @ORM\JoinColumn(name="resource_id", referencedColumnName="id")
     */
    protected $idResource;
    
    /**
     * One Region has One Faction.
     * @ORM\OneToOne(targetEntity="Resource")
     * @ORM\JoinColumn(name="resource_later_id", referencedColumnName="id")
     */
    protected $idResourceLater;
    
    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Region
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set populationBase
     *
     * @param integer $populationBase
     *
     * @return Region
     */
    public function setPopulationBase($populationBase)
    {
        $this->population_base = $populationBase;

        return $this;
    }

    /**
     * Get populationBase
     *
     * @return integer
     */
    public function getPopulationBase()
    {
        return $this->population_base;
    }

    /**
     * Set wealthBase
     *
     * @param integer $wealthBase
     *
     * @return Region
     */
    public function setWealthBase($wealthBase)
    {
        $this->wealth_base = $wealthBase;

        return $this;
    }

    /**
     * Get wealthBase
     *
     * @return integer
     */
    public function getWealthBase()
    {
        return $this->wealth_base;
    }

    /**
     * Set idFaction
     *
     * @param \AppBundle\Entity\Faction $idFaction
     *
     * @return Region
     */
    public function setIdFaction(\AppBundle\Entity\Faction $idFaction = null)
    {
        $this->idFaction = $idFaction;

        return $this;
    }

    /**
     * Get idFaction
     *
     * @return \AppBundle\Entity\Faction
     */
    public function getIdFaction()
    {
        return $this->idFaction;
    }

    /**
     * Set idReligion
     *
     * @param \AppBundle\Entity\Religion $idReligion
     *
     * @return Region
     */
    public function setIdReligion(\AppBundle\Entity\Religion $idReligion = null)
    {
        $this->idReligion = $idReligion;

        return $this;
    }

    /**
     * Get idReligion
     *
     * @return \AppBundle\Entity\Religion
     */
    public function getIdReligion()
    {
        return $this->idReligion;
    }

    /**
     * Set idResource
     *
     * @param \AppBundle\Entity\Resource $idResource
     *
     * @return Region
     */
    public function setIdResource(\AppBundle\Entity\Resource $idResource = null)
    {
        $this->idResource = $idResource;

        return $this;
    }

    /**
     * Get idResource
     *
     * @return \AppBundle\Entity\Resource
     */
    public function getIdResource()
    {
        return $this->idResource;
    }

    /**
     * Set idResourceLater
     *
     * @param \AppBundle\Entity\Resource $idResourceLater
     *
     * @return Region
     */
    public function setIdResourceLater(\AppBundle\Entity\Resource $idResourceLater = null)
    {
        $this->idResourceLater = $idResourceLater;

        return $this;
    }

    /**
     * Get idResourceLater
     *
     * @return \AppBundle\Entity\Resource
     */
    public function getIdResourceLater()
    {
        return $this->idResourceLater;
    }
}
