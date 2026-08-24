<?php
/*! pimpmylog - 1.7.16 - c706648a955428611a61f0251989a48e99e51b30*/
/*
 * pimpmylog
 * http://pimpmylog.com
 *
 * Copyright (c) 2026 Potsky, contributors
 * Licensed under the GPLv3 license.
 */
?>
<?php

$paths = array();
$files = array(
	'error' => array(
	)
);

$path = ( SAFE_MODE === true ) ? '' : ini_get('error_log');

if ( $path !== '' ) {
	$paths[]          = dirname( $path ) . DIRECTORY_SEPARATOR ;
	$files['error'][] = basename( $path );
}
