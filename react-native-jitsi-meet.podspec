require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = 'react-native-jitsi-meet'
  s.version      = package['version']
  s.summary      = package['description']
  s.license      = package['license']

  s.authors      = package['author']
  s.homepage     = package['homepage']
  s.platform     = :ios, "11.0"

  s.source       = { :git => package['repository']['url'], :tag => s.version }
  s.source_files = "ios/*.{h,m}"

  s.dependency 'React'
  s.dependency 'JitsiMeetSDK', '3.10.2'
end
