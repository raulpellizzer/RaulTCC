const {Builder, By, Key, util, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const jsAttribute = require('selenium-webdriver/lib/atoms/get-attribute');
const jsIsDisplayed = require('selenium-webdriver/lib/atoms/is-displayed');

module.exports = {Builder, By, Key, util, until, chrome, jsAttribute, jsIsDisplayed};