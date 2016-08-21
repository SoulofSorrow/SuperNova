<?php
use Mission\Mission;

/**
 * Fleet mission "Hold"
 *
 * @param $mission_data Mission
 *
 * @copyright 2008 by Gorlum for Project "SuperNova.WS"
 */
function flt_mission_hold($mission_data) {
  if($mission_data->fleet->time_mission_job_complete < SN_TIME_NOW) {
    $mission_data->fleet->markReturnedAndSave();
  }
}
