#
# A fast and type safe deep (recursive) object/array/function freeze
#
# MIT License
#
# Copyright (c) 2018 Dennis Raymondo van der Sluis
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#


FUNCTION_PROPS		= [ 'caller', 'callee', 'arguments' ]
# use flawed 'object' identification to allow for arrays
isArrObj				= ( obj ) -> (typeof obj is 'object')
isFunction			= ( obj ) -> (typeof obj is 'function')
specialFunction	= ( key, value ) -> (isFunction value) and (~FUNCTION_PROPS.indexOf key)


module.exports= freezeDeep= ( obj, recurse ) ->
	# don't try to loop over a non-object/array
	if recurse or (isArrObj obj) or (isFunction obj)
		Object.freeze obj
		for own key, value of obj
			continue if (Object.isFrozen value)
			if (isArrObj value) or (specialFunction key, value)
				freezeDeep value, true
	return obj