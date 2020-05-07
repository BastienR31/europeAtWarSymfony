<?php

namespace AppBundle\Controller\Api;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\QueryBuilder;

use Nelmio\ApiDocBundle\Annotation\ApiDoc;

use FOS\RestBundle\Controller\FOSRestController;

/**
 * Description of RegionController
 *
 */
class RegionController extends FOSRestController{
    
     /**
     * @ApiDoc(
     *  resource=true,
     *  description="Get all the regions of DB"
     * )
     */
    public function getRegionsAction(Request $request)
    {
        
        $em = $this->getDoctrine()->getManager();
        
        $queryRegion = $em->createQueryBuilder('')
                ->select('region.id, region.name')
                ->from('AppBundle:Region','region');
        
        $resultRegion = $queryRegion->getQuery()->getResult();
        
        $response = new Response(json_encode($resultRegion), Response::HTTP_OK);
        
        return $response;
    }
    
}
