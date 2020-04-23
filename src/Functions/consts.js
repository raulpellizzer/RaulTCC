"use strict";

const {Builder, By, Key, util, until} = require('selenium-webdriver');
const chrome                          = require('selenium-webdriver/chrome');
const jsAttribute                     = require('selenium-webdriver/lib/atoms/get-attribute');
const jsIsDisplayed                   = require('selenium-webdriver/lib/atoms/is-displayed');
const reportPath                      = 'C:\\TCC\\src\\data\\Search.txt';
const errorPath                       = 'C:\\TCC\\src\\data\\errors.txt';
const configPath                      = 'C:\\TCC\\src\\data\\config.ini';

module.exports = {Builder, By, Key, util, until, chrome, jsAttribute, jsIsDisplayed, reportPath, errorPath, configPath};